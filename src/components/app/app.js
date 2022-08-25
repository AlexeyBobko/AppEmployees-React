import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmloyeesList from '../employees-list/employees-list';
import EmplyeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John C.', salary: 1000, increase: true, like: false, id: 1},
                {name: 'Ivan P.', salary: 21000, increase: false, like: true, id: 2},
                {name: 'Alex F.', salary: 2000, increase: false, like: false, id: 3},
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }


    searchEmp = (items, term) => {
        if(term.length === 0) return items;

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        switch(filter) {
            case 'rise':
                return items.filter(item => item.like);
            case 'moreThan1000':
                return items.filter(item => item.salary > 1000);
            case 'getPremium':
                return items.filter(item => item.increase);
            default:
                return items 
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const employees = data.length;
        const incresed = data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter)
        return (
            <div className="app">
                <AppInfo employees={employees} incresed={incresed}/>
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filetr={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
                <EmloyeesList 
                data={visibleData}
                onDelete={this.deleteItem}
                onToggleProp={this.onToggleProp}
                />
                <EmplyeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;