"use client";

import {
  CreditCardIcon,
  FolderOpenIcon,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon,
  type LucideIcon,
} from "lucide-react";
import type { Route } from "next";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { useAuth } from "@/features/auth/helper";
import Logo from "./logo";
import { paymentCheckout } from "@/features/payment/polar/helper";

interface AppMenuItem {
  title: string;
  items: Array<{
    title: string;
    icon: LucideIcon;
    href: Route;
  }>;
}

type ActionKey = NonNullable<
  (typeof footerMenuItems)[number]["onClickFunctionName"]
>;

type ActionHandler = Record<ActionKey, () => void>;

const menuItems: AppMenuItem[] = [
  {
    title: "workflows",
    items: [
      {
        title: "Workflows",
        icon: FolderOpenIcon,
        href: "/workflows",
      },
      {
        title: "Executions",
        icon: HistoryIcon,
        href: "/executions",
      },
      {
        title: "Credentials",
        icon: KeyIcon,
        href: "/credentials",
      },
    ],
  },
];

const footerMenuItems = [
  {
    title: "Upgrade to pro",
    icon: StarIcon,
    onClickFunctionName: "paymentCheckout",
  },
  {
    title: "Billing",
    icon: CreditCardIcon,
    onClickFunctionName: "",
  },
  {
    title: "Sign out",
    icon: LogOutIcon,
    onClickFunctionName: "logout",
  },
] as const;

const CustomSidebarMenuButton = ({
  children,
  className,
  ...rest
}: Parameters<typeof SidebarMenuButton>[0]) => {
  return (
    <SidebarMenuButton
      {...rest}
      className={cn("gap-x-3 p-3 cursor-pointer", className)}
    >
      {children}
    </SidebarMenuButton>
  );
};

const SidebarMenuButtonContent = ({
  icon: IconComp,
  children,
}: {
  icon: LucideIcon;
  children: ReactNode;
}) => {
  return (
    <>
      <IconComp />
      <span className="first-letter:uppercase">{children}</span>
    </>
  );
};

function SidebarGroupContentChild(props: Pick<AppMenuItem, "items">) {
  const pathname = usePathname();

  return props.items.map((item) => {
    return (
      <SidebarMenuItem key={item.title}>
        <CustomSidebarMenuButton
          className="data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
          tooltip={item.title}
          isActive={
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href)
          }
          asChild
        >
          <Link href={item.href} prefetch>
            <SidebarMenuButtonContent icon={item.icon}>
              {item.title}
            </SidebarMenuButtonContent>
          </Link>
        </CustomSidebarMenuButton>
      </SidebarMenuItem>
    );
  });
}

// TODO: change this function. Not well though out [footer and funcs, maybe not use a footer array]
function AppSidebar() {
  const { logout } = useAuth();
  const footerActions = {
    logout,
    paymentCheckout,
  } as ActionHandler;

  return (
    <Sidebar collapsible="icon" side="left" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              role="none"
              className="p-0 group-data-[collapsible=icon]:p-0!"
              tooltip={"nodex"}
            >
              <Logo className="size-8 shrink-0" />
              <span className="capitalize font-semibold">nodex</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {menuItems.map(({ items, title }) => {
          return (
            <SidebarGroup key={title}>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarGroupContentChild {...{ items }} />
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarFooter className="mb-8">
        <SidebarMenu>
          {footerMenuItems.map(({ title, onClickFunctionName, icon }) => (
            <SidebarMenuItem key={title}>
              <CustomSidebarMenuButton
                tooltip={title}
                onClick={footerActions[onClickFunctionName]}
              >
                <SidebarMenuButtonContent icon={icon}>
                  {title}
                </SidebarMenuButtonContent>
              </CustomSidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
