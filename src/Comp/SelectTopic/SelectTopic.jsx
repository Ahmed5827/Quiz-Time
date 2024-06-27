import React from "react";
import Category from './../Resusable/Category/Category';
function SelectTopic() {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h3> Select Topic</h3>
            <small>Featured Category</small>
          </div>
        </div>
        <div className="row">
            <div className="col">
                <Category image='Entertainment: Books'></Category>
                <Category image='Science: Computers'></Category>
                <Category image='Sports'></Category>
            </div>
            <div className="col">
                <Category image='Art'></Category>
                <Category image='History'></Category>
                <Category image='Science & Nature'></Category>
            </div>
            <div className="col">
                <Category image='Entertainment: Comics'></Category>
                <Category image='Entertainment: Music'></Category>
                <Category image='Entertainment: Books'></Category>
            </div>
            
        </div>
        <div className="row">
        <div className="col"><button className="btn btn-secondary">More</button></div>

            
        </div>
      </div>
    </div>
  );
}

export default SelectTopic;
