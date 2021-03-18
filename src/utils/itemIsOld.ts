const itemIsOld = (item: IItem) => {
  const { createdAt } = item;

  // Probably would be better to use Moment.js or date-fsn to check the timezoned value
  return new Date(createdAt).getDay() > 30;
};

export default itemIsOld;
