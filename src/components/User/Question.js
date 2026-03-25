import "./detailquizz.scss";
import _ from "lodash";
import "./Question.scss";
const Question = (props) => {
  const { data, index, isSelected } = props;
  if (_.isEmpty(data)) return;
  return (
    <div className="Q-container">
      <div className="q-image">
        {data.image ? (
          <div className="image">
            {data && data.image && (
              <img
                alt="index"
                className="image-child"
                src={`data:image/jpeg;base64,${data.image}`}
              />
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div className="question">
        Question {index + 1} : {data.description}
      </div>
      <div className="answer">
        {data?.answers &&
          data?.answers.length &&
          data.answers.map((a, index) => {
            const checked = (isSelected[data.id] || []).includes(a.id);
            return (
              <div key={a.id} className="form-check abc-checkbox">
                <input
                  id={`${data.id}${a.id}`}
                  onChange={() => props.handlecheck(data.id, a.id)}
                  className="form-check-input"
                  type="checkbox"
                  aria-label="Single checkbox One"
                  checked={checked}
                />
                <label
                  className="form-check-label"
                  htmlFor={`${data.id}${a.id}`}
                >
                  {a.description}
                </label>
              </div>
            );
            // return <div key={`answer-${index}`}>{a.description}</div>;
          })}
      </div>
    </div>
  );
};
export default Question;
