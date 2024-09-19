import {Header, Form, Input, Button} from './SearchBar.styled.js'
import {FC, FormEvent} from 'react'

interface ISearchBarProps {
    onSubmit: (values:string) => void
}

const SearchBar:FC<ISearchBarProps> = ({onSubmit}) => {

    const onHandleSubmit:(e:FormEvent<HTMLFormElement>) => void = (e) => {
        e.preventDefault()

        const form = e.target as HTMLFormElement
        const elements = form.elements as HTMLFormControlsCollection

        onSubmit((elements[0] as HTMLInputElement).value)

        form.reset()
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