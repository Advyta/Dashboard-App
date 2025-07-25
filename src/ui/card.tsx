import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

type CardProps<T> = {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  title?: string;
};

function Card<T>({ data, renderItem, title }: CardProps<T>) {
  return (
    <div className="card card-dash bg-gray-100/20  rounded-lg">
      <div className="card-body">
        {title && (
          <div className="flex ">
            <h2 className="card-title">{title}</h2>
            {/* refresh icon */}
            <FontAwesomeIcon icon={faRotateRight} />
          </div>
        )}
        {data.map((item, idx) => renderItem(item, idx))}
      </div>
    </div>
  );
}

export default Card;
