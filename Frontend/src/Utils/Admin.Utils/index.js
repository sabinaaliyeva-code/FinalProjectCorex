export const sortData = (data, sortBy, field = "title") => {
  const sorted = [...data];

  switch (sortBy) {
    case "az":
      return sorted.sort((a, b) =>
        String(a[field]).localeCompare(String(b[field]))
      );

    case "za":
      return sorted.sort((a, b) =>
        String(b[field]).localeCompare(String(a[field]))
      );

    case "low-high":
      return sorted.sort((a, b) => a.price - b.price);

    case "high-low":
      return sorted.sort((a, b) => b.price - a.price);

    case "newest":
      return sorted.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

    case "oldest":
      return sorted.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

    default:
      return sorted;
  }
};