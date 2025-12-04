import { type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

type UserFooterItemProps = {
  title: string;
  content: string;
  icon: LucideIcon;
  url?: string;
};

export function UserFooterItem({
  title,
  content,
  icon: Icon,
  url,
}: UserFooterItemProps) {
  if (url)
    return (
      <Link
        to={url}
        className="flex min-w-[15rem] justify-start items-center w-full gap-3 px-3 py-1.5 border border-border hover:border-ring hover:bg-accent/50 rounded-lg transition-[border-color, background-color] duration-250"
      >
        <div className="flex justify-center items-center p-2 bg-accent/30 border border-ring rounded-md">
          <Icon className="size-6 text-ring" />
        </div>
        <div>
          <h2 className="text-primary font-medium">{title}</h2>
          <h3 className="text-nowrap wrap-anywhere max-sm:text-wrap">
            {content}
          </h3>
        </div>
      </Link>
    );

  return (
    <div className="flex min-w-[15rem] justify-start items-center w-full gap-3 px-3 py-1.5 border border-border hover:border-ring hover:bg-accent/50 rounded-lg transition-[border-color, background-color] duration-250">
      <div className="flex justify-center items-center p-2 bg-accent/30 border border-ring rounded-md">
        <Icon className="size-6 text-ring" />
      </div>
      <div className="flex flex-col justify-center items-start">
        <h2 className="text-primary font-medium">{title}</h2>
        <h3 className="text-nowrap wrap-anywhere max-sm:text-wrap">
          {content}
        </h3>
      </div>
    </div>
  );
}
