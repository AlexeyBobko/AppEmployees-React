import './employees-list-item.css';

const EmloyeesListItem = (props) => {
        const {name, salary, onDelete, onToggleProp, increase, like} = props;
        let ClassN = "list-group-item d-flex justify-content-between";
            if(increase) {
                ClassN += " increase";
            }
            if(like) {
                ClassN += " like";
            }
        
        return (
            <li className={ClassN}>
                <span onClick={onToggleProp} data-toggle="like" className="list-group-item-label">{name}</span>
                <input type="text" className="list-group-item-input" defaultValue={salary + '$'}/>
                <div className='d-flex justify-content-center align-items-center'>
                    <button type="button"
                        className="btn-cookie btn-sm "
                        onClick={onToggleProp}
                        data-toggle="increase">
                        <i className="fas fa-cookie"></i>
                    </button>

                    <button type="button"
                            className="btn-trash btn-sm "
                            onClick={onDelete}>
                        <i className="fas fa-trash"></i>
                    </button>
                    <i className="fas fa-star"></i>
                </div>
            </li>
        );
    }

export default EmloyeesListItem;