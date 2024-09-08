// import { IProjectInfoData } from "../App";
import Rspan, { getHtmlFromString } from "../../utils/ramdom";

import { data } from "../../assets/data/Project.json";

interface IProjectProps {
  index: number;
}

export default function RenderProject({ index }: IProjectProps) {
  let info = data[index];
  let imageIndex = 0;
  const GetNextImage = () => {
    if (info.images && info.images.length > imageIndex) {
      let result = (
        <div className="custom_img" data-border>
          <img src={info.images[imageIndex]} alt={`<--${imageIndex}-->`} />
        </div>
      );
      imageIndex++;
      return result;
    }
  };

  const RestOfImages = () => {
    if (info.images) {
      let result = [];

      for (; info.images.length > imageIndex; imageIndex++) {
        result.push(
          <div className="custom_img" data-border>
            <img src={info.images[imageIndex]} alt={`<--${imageIndex}-->`} />
          </div>
        );
      }
      return result;
    }
  };
  return (
    <>
      <div>
        <h2>
          [Built in <Rspan>{info.year}</Rspan>]
        </h2>
        <div className="technologies">
          {info.technologies.map((ele) => {
            return getHtmlFromString(ele, true);
          })}
        </div>
        <div className="pro_links">
          {info.githubUrl && (
            <a data-border href={info.githubUrl}>
              github
            </a>
          )}
          {info.demoUrl && (
            <a data-border href={info.demoUrl}>
              Demo
            </a>
          )}
        </div>
      </div>

      {/* alternate b/w para and img  */}

      {info.content.map((ele, i) => {
        return (
          <>
            <div key={"PR" + i}>{getHtmlFromString(ele)}</div>
            {GetNextImage()}
          </>
        );
      })}
      {RestOfImages()}
    </>
  );
}
