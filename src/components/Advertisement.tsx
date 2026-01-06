import { BadgeCheck, ExternalLink } from "lucide-react";

const Advertisement = () => {
  return (
    <div className="bg-card overflow-hidden">
      {/* Ad Label */}
      <div className="px-3 py-2 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Sponsored</span>
        <span className="text-xs text-muted-foreground">Ad</span>
      </div>

      {/* Ad Image */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=400&fit=crop"
          alt="Advertisement"
          className="w-full h-48 object-cover"
        />
      </div>

      {/* Ad Content */}
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">AD</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm">Premium Headphones</span>
              <BadgeCheck className="h-4 w-4 text-primary" fill="currentColor" />
            </div>
            <p className="text-xs text-muted-foreground">Shop Now</p>
          </div>
        </div>
        
        <p className="text-sm mb-3">
          Experience crystal clear audio with our premium wireless headphones. 
          Limited time offer - 30% off!
        </p>

        <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          <span>Learn More</span>
          <ExternalLink className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Advertisement;
