/* eslint-disable consistent-return */
import { useEffect, useState } from "react";
 
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Correction de l'ordre de tri pour du plus ancien au plus récent
  const byDateAsc = data?.focus ? [...data.focus].sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? 1 : -1
  ) : [];

 
  useEffect(() => {
    if (byDateAsc.length > 0) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % byDateAsc.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [byDateAsc.length]);

  if (!byDateAsc.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="SlideCardList">
      {byDateAsc.map((event, idx) => (
        <div
          key={event.id} // Utilisation d'un identifiant unique 
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateAsc.map((event, radioIdx) => (
            <input
              key={event.id} // Utiliser un identifiant unique ici
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
