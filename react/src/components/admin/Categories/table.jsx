import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import DeleteCategories from "./DeleteCategories";
import { TimeDay } from "../../../Global/Time";

const NestedCategories = ({ categories }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleShowChildren = (itemId) => {
    setSelectedItems(
      selectedItems.includes(itemId)
        ? selectedItems.filter((id) => id !== itemId)
        : [...selectedItems, itemId]
    );
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {categories.map((item) => (
        <Card key={item.id} style={{ width: "18rem", margin: "10px" }}>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>{item.info}</Card.Text>
            {/* Render other category details as needed */}
            <div>
              <div>
                <img
                  src={"http://127.0.0.1:8000/cover/" + item.cover}
                  className="rounded-circle"
                  width={44}
                  height={44}
                  alt="test"
                />
              </div>
              <div>Author: {item.auther}</div>
              <div>Created: {TimeDay(item.created_at)}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {item.children?.length > 0 && (
                <button
                  onClick={() => handleShowChildren(item.id)}
                  className="text-primary btn"
                >
                  {selectedItems.includes(item.id) ? "Hide" : "Show"} Children
                </button>
              )}
              <button onClick={() => dispatchEdit(item.id)} className="text-warning btn">
                Edit
              </button>
              <DeleteCategories id={item.id} name={item.name} cover={item.cover} />
            </div>
            {selectedItems.includes(item.id) && item.children?.length > 0 && (
              <NestedCategories categories={item.children} />
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

const TableCategories = ({ all_categories }) => {
  return <NestedCategories categories={all_categories} />;
};

export default TableCategories;
