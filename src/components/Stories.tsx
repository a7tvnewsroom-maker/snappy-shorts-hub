const stories = [
  { id: "create", name: "Your Story", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop", isCreate: true },
  { id: "1", name: "A7TV News", avatar: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=100&h=100&fit=crop", hasStory: true },
  { id: "2", name: "Sports Hub", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", hasStory: true },
  { id: "3", name: "Tech Daily", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", hasStory: true },
  { id: "4", name: "Finance", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop", hasStory: true },
  { id: "5", name: "Lifestyle", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", hasStory: false },
];

const Stories = () => {
  return (
    <div className="bg-card rounded-xl shadow-sm py-4">
      <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar">
        {stories.map((story) => (
          <button
            key={story.id}
            className="flex flex-col items-center gap-2 flex-shrink-0"
          >
            <div className={`relative ${story.isCreate ? "" : story.hasStory ? "p-[2px] rounded-full bg-gradient-to-tr from-primary via-accent to-primary" : ""}`}>
              <div className={`${story.isCreate ? "" : "bg-card p-[2px] rounded-full"}`}>
                <img
                  src={story.avatar}
                  alt={story.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
              </div>
              {story.isCreate && (
                <div className="absolute -bottom-0.5 -right-0.5 h-6 w-6 rounded-full brand-gradient border-2 border-card flex items-center justify-center">
                  <span className="text-primary-foreground text-sm font-bold">+</span>
                </div>
              )}
            </div>
            <span className="text-[11px] font-medium text-muted-foreground max-w-[64px] truncate">
              {story.isCreate ? "Add Story" : story.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Stories;
