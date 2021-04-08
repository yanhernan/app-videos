import { Input } from "antd";
import debounce from "lodash.debounce";

export interface InputSearchProps {
    onSearch: (query: string) => void;
}

const InputSearch: React.FunctionComponent<InputSearchProps> = ({ onSearch }) => {
    const search = (query: string) => {
        debounce(() => onSearch(query), 500)();
    }
    return <Input.Search onSearch={search} />
}


export default InputSearch;