
import { render, screen, waitFor, fireEvent} from '@testing-library/react'
import { Navbar } from "../Components/Navbar.js"
import { MemoryRouter } from 'react-router-dom';
import { Visitors } from "../pages/Visitors.js";
import "@testing-library/jest-dom";

process.env.NODE_ENV = "development";

afterEach(() => {
    fetch.resetMocks()
})

beforeEach(() => {
    fetch.mockClear()
})

test("Navbar Component renders", () => {
    render(
        <MemoryRouter>
            <Navbar/>
        </MemoryRouter>
    )

    expect(screen.getByText(/Members/i)).toBeInTheDocument();
    expect(screen.getByText(/Visitors/i)).toBeInTheDocument();
    expect(screen.getByText(/Add a Visitor/i)).toBeInTheDocument();
})


test("Visitors table renders data, and responds to search filter", async () => {

    fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
            visitorQueryResult: [
            {id: 1, Name: "Visitor1", Company: "PotatoJS", Email: "test@gmail.com", Phone: "919-884-1589", Referrer: "Anonymous"},
            {id: 2, Name: "Visitor2", Company: "PotatoJS", Email: "test@gmail.com", Phone: "919-884-1589", Referrer: "Anonymous"},
            {id: 3, Name: "Visitor3", Company: "PotatoJS", Email: "test@gmail.com", Phone: "919-884-1589", Referrer: "Anonymous"},
            ]
        })
    })

    fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
            visitorQueryResult: [
            {id: 1, Name: "Visitor1", Company: "PotatoJS", Email: "test@gmail.com", Phone: "919-884-1589", Referrer: "Anonymous"}
            ],
        })
    })

    fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
            visitorQueryResult: [
            {id: 1, Name: "Visitor1", Company: "PotatoJS", Email: "test@gmail.com", Phone: "919-884-1589", Referrer: "Anonymous"},
            {id: 2, Name: "Visitor2", Company: "PotatoJS", Email: "test@gmail.com", Phone: "919-884-1589", Referrer: "Anonymous"},
            {id: 3, Name: "Visitor3", Company: "PotatoJS", Email: "test@gmail.com", Phone: "919-884-1589", Referrer: "Anonymous"},
            ],
        })
    })


    fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
            visitorQueryResult: []
        })
    })


    render(
        <MemoryRouter>
            <Visitors/>
        </MemoryRouter>
    )

    await waitFor(() => {
        expect(screen.getByText("Visitor1", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Visitor2", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Visitor3", {exact: true})).toBeInTheDocument();
        expect(screen.queryByText("Visitor5", {exact: true})).not.toBeInTheDocument();
    })

    const visitorSearch = screen.getByPlaceholderText("Search Visitor by Name");

    fireEvent.input(visitorSearch, {target: {value: 'Visitor1'}});

    await waitFor(() => {
        expect(screen.queryByText("Visitor1", {exact: true})).toBeInTheDocument();
        expect(screen.queryByText("Visitor2", {exact: true})).not.toBeInTheDocument();
        expect(screen.queryByText("Visitor3", {exact: true})).not.toBeInTheDocument();
    })

    fireEvent.change(visitorSearch, {target : {value: ''}});

    await waitFor(() => {
        expect(screen.getByText("Visitor1", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Visitor2", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Visitor3", {exact: true})).toBeInTheDocument();
    })

    fireEvent.input(visitorSearch, {target: {value: 'Member1'}});

    await waitFor(() => {
        expect(screen.queryByText("Visitor1", {exact: true})).not.toBeInTheDocument();
        expect(screen.queryByText("Visitor2", {exact: true})).not.toBeInTheDocument();
        expect(screen.queryByText("Visitor3", {exact: true})).not.toBeInTheDocument();
    })
})