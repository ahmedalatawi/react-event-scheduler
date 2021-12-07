import { ChangeEvent, useRef } from "react";

const SearchBox: React.FC = () => {
    const searchTextRef = useRef<HTMLInputElement>(null);

    const handleOnSubmit = (event: ChangeEvent<HTMLFormElement>) => {

    };

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log('value ', searchTextRef?.current?.value)
    };

     return (
        <form className="d-flex" onSubmit={handleOnSubmit} data-testid="SearchBoxForm">
            <input
            ref={searchTextRef}
                data-testid="SearchBoxInput"
                className="form-control me-2"
                type="search"
                placeholder="Search events by title, start and end date"
                aria-label="Search"
                onChange={handleOnChange} />
        </form>
    );
}

export default SearchBox;
