import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  variant: 'blue' | 'red' | 'green' | 'purple' | 'orange' | 'teal' | 'magenta';
  buttonText?: string;
  onButtonClick?: () => void;
  isLarge?: boolean;
}

export function DashboardCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  variant,
  buttonText,
  onButtonClick,
  isLarge = false
}: DashboardCardProps) {
  const getButtonVariant = () => {
    switch (variant) {
      case 'blue': return 'pet-blue';
      case 'red': return 'pet-red';
      case 'green': return 'pet-green';
      case 'purple': return 'pet-purple';
      case 'orange': return 'pet-orange';
      case 'teal': return 'pet-teal';
      case 'magenta': return 'pet-magenta';
      default: return 'default';
    }
  };

  return (
    <Card variant={variant} className="overflow-hidden cursor-pointer" onClick={onButtonClick}>
      <CardContent className={isLarge ? "p-8" : "p-6"}>
        <div className={`flex items-start ${isLarge ? 'flex-col text-center' : 'justify-between'}`}>
          <div className={`${isLarge ? 'w-full' : 'flex-1'}`}>
            {isLarge && (
              <div className="mb-6">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Icon className="w-8 h-8" />
                </div>
              </div>
            )}
            <h3 className={`font-semibold mb-2 ${isLarge ? 'text-2xl' : 'text-lg'}`}>{title}</h3>
            {!isLarge && <p className="text-3xl font-bold mb-1">{value}</p>}
            {description && <p className={`opacity-90 ${isLarge ? 'text-lg' : 'text-sm'} ${isLarge ? 'mb-6' : 'mb-4'}`}>{description}</p>}
            
            {buttonText && (
              <Button 
                variant="outline"
                size={isLarge ? "lg" : "sm"}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onButtonClick?.();
                }}
              >
                {buttonText}
              </Button>
            )}
            
            {isLarge && !buttonText && (
              <p className="text-xl font-semibold">{value}</p>
            )}
          </div>
          
          {!isLarge && (
            <div className="ml-4">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}