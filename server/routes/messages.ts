export const postMessages = (req: any, res: any) => {
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
};

export const putMessage = (req: any, res: any) => {
  res.send(
    `I received your PUT request. This is what you sent me: ${req.body.put}`
  );
};
