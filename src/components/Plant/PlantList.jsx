import "./Plant.css";

const PlantList = ({ plants }) => {
  return (
    <div className="Plant-list">
      {plants.map((plant) => {
        return (
          <div key={plant.id} className="Plant-list__thumbnail">
            <img
              className="Plant-list__img"
              alt={plant.name}
              src={plant.imgUrl}
            />
            <h3 className="Plant-list__name">{plant.name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default PlantList;
