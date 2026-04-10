// Content service — replace with real API calls when backend is ready

export const getAIContent = async (_type?: "image" | "video") => {
  // TODO: Replace with real API call
  // const url = type ? `/api/content?type=${type}` : '/api/content';
  // const res = await fetch(url);
  // return res.json();
};

export const deleteContent = async (_contentId: number) => {
  // TODO: Replace with real API call
  // await fetch(`/api/content/${contentId}`, { method: 'DELETE' });
};

export const moderateContent = async (
  _contentId: number,
  _action: "approve" | "reject",
) => {
  // TODO: Replace with real API call
  // const res = await fetch(`/api/content/${contentId}/moderate`, {
  //   method: 'POST',
  //   body: JSON.stringify({ action }),
  // });
  // return res.json();
};
