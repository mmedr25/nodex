import Logo from "@/components/shared/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export function AuthCard({ children, title, description }: AuthCardProps) {
  return (
    <div className="grid min-h-screen place-items-center bg-muted">
      <Card className="min-w-100 w-[90%] sm:w-[30%]">
        <div className="flex justify-center">
          <Logo />
        </div>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">{children}</CardContent>
      </Card>
    </div>
  );
}
