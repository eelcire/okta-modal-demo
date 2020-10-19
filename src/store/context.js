import React, { Component } from "react";
import items from "./data";

const RoomContext = React.createContext(null);

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  };

  // Get Data when component mount
  componentDidMount() {
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter((room) => room.featured === true);
    let maxPrice = Math.max(...rooms.map((item) => item.price));
    let maxSize = Math.max(...rooms.map((item) => item.size));

    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize,
    });
  }

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
          handleChecked: this.handleChecked,
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }

  formatData = (items) => {
    const tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);
      const room = { ...item.fields, images, id }; // Reformating the array
      return room;
    });

    return tempItems;
  };

  getRoom = (slug) => {
    const tempRooms = [...this.state.rooms];
    const room = tempRooms.find((room) => room.slug === slug);
    return room;
  };

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    const obj = {};
    obj[name] = value;

    this.setState(obj, this.filterRooms);
  };

  handleChecked = (event) => {
    console.log("pets", this.state.pets);
    console.log("breakfast", this.state.breakfast);
    const value = event.target.checked;
    const name = event.target.name;

    const obj = {};
    obj[name] = value;

    this.setState(obj, this.filterRooms);
  };

  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets,
    } = this.state;
    // all the rooms
    let tempRooms = [...rooms];
    // transform value
    capacity = Number(capacity);
    price = Number(price);

    // filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter((room) => room.type === type);
    }

    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }

    // filter by price
    tempRooms = tempRooms.filter((room) => room.price <= price);

    // filter by size
    tempRooms = tempRooms.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );

    // filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast === true);
    }

    // filter by pets
    if (pets) {
      tempRooms = tempRooms.filter((room) => room.pets === true);
    }

    // change state
    this.setState({
      sortedRooms: tempRooms,
    });
  };
}

const RoomConsumer = RoomContext.Consumer;

// For Using Context with Functional Component (Stateless) with HOC
export const withRoomConsumer = (Component) => (props) => {
  return (
    <RoomConsumer>
      {(value) => <Component {...props} context={value} />}
    </RoomConsumer>
  );
};

// Exporting all contexts
export { RoomProvider, RoomConsumer, RoomContext };
