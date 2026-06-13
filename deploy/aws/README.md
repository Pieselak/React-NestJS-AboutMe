# Deployment on AWS EC2 with Amazon ECR

The deployment uses two independent images:

- `portfolio-web`: the Vite build served by unprivileged nginx on port `8080`;
- `portfolio-api`: the NestJS API running as a non-root user on port `2100`.

PostgreSQL and Redis are external services. On AWS, use RDS and ElastiCache
instead of storing production data in this Compose project.

## 1. Create ECR repositories

```bash
aws ecr create-repository --repository-name portfolio-web --region eu-central-1
aws ecr create-repository --repository-name portfolio-api --region eu-central-1
```

## 2. Log Docker in to ECR

```bash
aws ecr get-login-password --region eu-central-1 \
  | docker login --username AWS --password-stdin 123456789012.dkr.ecr.eu-central-1.amazonaws.com
```

Replace the account ID and region in all examples.

## 3. Build the images

Run these commands from the monorepo root. Vite variables are compiled into the
web image and cannot be changed later by Docker Compose.

```bash
docker build \
  --file apps/web/Dockerfile \
  --build-arg VITE_API_URL=https://api.example.com \
  --build-arg VITE_CONTACT_EMAIL=contact@example.com \
  --tag 123456789012.dkr.ecr.eu-central-1.amazonaws.com/portfolio-web:latest \
  .

docker build \
  --file apps/api/Dockerfile \
  --tag 123456789012.dkr.ecr.eu-central-1.amazonaws.com/portfolio-api:latest \
  .
```

Use an immutable tag such as a Git commit SHA in addition to `latest` for
repeatable deployments.

## 4. Push the images

```bash
docker push 123456789012.dkr.ecr.eu-central-1.amazonaws.com/portfolio-web:latest
docker push 123456789012.dkr.ecr.eu-central-1.amazonaws.com/portfolio-api:latest
```

## 5. Prepare EC2

Install Docker Engine, the Docker Compose plugin, and AWS CLI. Attach an EC2 IAM
role with `AmazonEC2ContainerRegistryReadOnly` so the instance can pull private
images without permanent AWS access keys.

Copy `deploy/aws/compose.yaml` and create `deploy/aws/.env` from `.env.example`.
Keep `.env` outside Git and limit access to it because it contains secrets.

Log in to ECR on the instance:

```bash
aws ecr get-login-password --region eu-central-1 \
  | docker login --username AWS --password-stdin 123456789012.dkr.ecr.eu-central-1.amazonaws.com
```

## 6. Deploy or update

From the directory containing `compose.yaml` and `.env`:

```bash
docker compose pull
docker compose up -d --remove-orphans
docker compose ps
```

To inspect logs:

```bash
docker compose logs --tail=200 api
docker compose logs --tail=200 web
```

## AWS networking

Expose only ports `80` and `443` publicly in the EC2 security group. Port `2100`
should be exposed only when an Application Load Balancer or reverse proxy needs
to reach the API. For a public API subdomain, terminate TLS at an ALB or another
reverse proxy and route `api.example.com` to port `2100`.

Allow the EC2 security group to reach RDS and ElastiCache on their private
ports. Do not expose PostgreSQL or Redis to the public internet.

