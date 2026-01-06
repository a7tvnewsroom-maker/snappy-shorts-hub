import { Plus, Music, Trophy, Cpu, DollarSign, Heart } from "lucide-react";

const stories = [
  { id: "create", name: "Add Story", icon: Plus, isCreate: true },
  { id: "1", name: "A7TV News", icon: Music, hasStory: true },
  { id: "2", name: "Sports Hub", icon: Trophy, hasStory: true },
  { id: "3", name: "Tech Daily", icon: Cpu, hasStory: true },
  { id: "4", name: "Finance", icon: DollarSign, hasStory: true },
  { id: "5", name: "Lifestyle", icon: Heart, hasStory: false },
];

const Stories = () => {
  return (
    <div className="bg-card py-4">
      <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar">
        {stories.map((story) => {
          const Icon = story.icon;
          return (
            <button
              key={story.id}
              className="flex flex-col items-center gap-2 flex-shrink-0"
            >
              <div className={`relative ${story.isCreate ? "" : story.hasStory ? "p-[3px] rounded-full bg-primary" : ""}`}>
                <div className={`${story.isCreate ? "" : "bg-card p-[2px] rounded-full"}`}>
                  <div className={`h-16 w-16 rounded-full flex items-center justify-center ${story.isCreate ? "bg-secondary" : "bg-secondary"}`}>
                    <Icon className={`h-7 w-7 ${story.isCreate ? "text-muted-foreground" : "text-foreground"}`} />
                  </div>
                </div>
                {story.isCreate && (
                  <div className="absolute -bottom-0.5 -right-0.5 h-6 w-6 rounded-full bg-primary border-2 border-card flex items-center justify-center">
                    <Plus className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
              <span className="text-[11px] font-medium text-muted-foreground max-w-[64px] truncate">
                {story.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Stories;
