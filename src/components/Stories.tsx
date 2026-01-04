const stories = [
  { id: "create", name: "Create story", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop", isCreate: true },
  { id: "1", name: "A7TV News", avatar: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=100&h=100&fit=crop", hasStory: true },
  { id: "2", name: "Global Report", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", hasStory: true },
  { id: "3", name: "Sports Central", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", hasStory: true },
  { id: "4", name: "Finance Daily", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop", hasStory: false },
];

const Stories = () => {
  return (
    <div className="bg-card shadow-card py-3">
      <div className="flex gap-2 px-3 overflow-x-auto no-scrollbar">
        {stories.map((story) => (
          <button
            key={story.id}
            className="flex flex-col items-center gap-1 flex-shrink-0"
          >
            <div className={`relative ${story.isCreate ? "" : story.hasStory ? "p-0.5 rounded-full bg-gradient-to-tr from-primary to-fb-purple" : ""}`}>
              <div className={`${story.isCreate ? "" : "bg-card p-0.5 rounded-full"}`}>
                <img
                  src={story.avatar}
                  alt={story.name}
                  className="h-14 w-14 rounded-full object-cover"
                />
              </div>
              {story.isCreate && (
                <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-primary border-2 border-card flex items-center justify-center">
                  <span className="text-primary-foreground text-lg leading-none">+</span>
                </div>
              )}
            </div>
            <span className="text-xs text-muted-foreground max-w-[60px] truncate">
              {story.isCreate ? "Create" : story.name.split(" ")[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Stories;
