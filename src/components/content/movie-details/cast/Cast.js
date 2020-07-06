import React from "react";
import "./Cast.scss";

const Cast = () => (
  <div className="cast">
    <div className="cast-title">キャスト・スタッフ</div>
    <table>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th className="cast-head">content</th>
          <th className="cast-head">content</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <img src="http://placehold.it/54x81" alt="" />
          </td>
          <td>content</td>
          <td>content</td>
          <td>content</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default Cast;
