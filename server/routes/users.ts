export const getUser = (req: any, res: any) => {
  const id = req.params.id;
  res.send({ express: `Requested data for user ID: ${id}` });
};
