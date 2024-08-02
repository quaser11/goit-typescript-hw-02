import {Header, Form, Input, Button} from './SearchBar.styled.js'

const SearchBar = ({onSubmit}) => {

    const onHandleSubmit = (e) => {
        e.preventDefault()

        const elements = e.target.elements

        onSubmit(elements[0].value)

        e.target.reset()
    }

    return <Header>
        <Form onSubmit={onHandleSubmit}>
            <Input
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
            />
            <Button type="submit">Search</Button>
        </Form>
    </Header>
}

export default SearchBar