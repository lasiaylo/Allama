import * as React from 'react';

interface WorkDetails {
  title: string;
  description: string;
  //  TO-DO: Typecast
  preview: any;
}

export default function WorksView({
  title,
  description,
  preview,
}: WorkDetails) {
  return (
    <div className="works-view">
      <div className="preview" />
      <div className="title">{title}</div>
      <div className="description">{description}</div>
    </div>
  );
}
