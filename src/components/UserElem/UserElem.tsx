interface IUserElem {
  mainText: string;
  imgLink: string;
  secondaryText: string;
  badgeNumber: number;
  altText: string;
}

export const UserElem = ({
  mainText,
  imgLink,
  secondaryText,
  badgeNumber,
  altText,
}: IUserElem) => {
  return (
    <div className="UserElem">
      <img src={imgLink} alt={altText} />
      <div className="user__description"> 
        <p className="main__text">{mainText}</p>
        <p className="secondary__text">{secondaryText}</p>
      </div>
      <span className="Badge">{badgeNumber}</span>
    </div>
  );
};

