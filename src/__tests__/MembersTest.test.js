
import { render, screen, waitFor, fireEvent} from '@testing-library/react'
import { Navbar } from "../Components/Navbar.js"
import { MemoryRouter } from 'react-router-dom';
import MembersTable from "../pages/Members.js";
import "@testing-library/jest-dom";



process.env.NODE_ENV = "development";

afterEach(() => {
    fetch.resetMocks();
})

beforeEach(() => {
    fetch.mockClear();
})

test("Navbar component renders correctly for Members page", () => {

    render(
        <MemoryRouter>
            <Navbar/>
        </MemoryRouter>
    );

    const memberText = screen.getByText(/Members/i);
    const visitorText = screen.getByText(/Visitors/i);
    const AddVisitorText = screen.getByText(/Add a Visitor/i);

    expect(memberText).toBeInTheDocument();
    expect(visitorText).toBeInTheDocument();
    expect(AddVisitorText).toBeInTheDocument();
})



test("MembersTable renders data and responds to page changes", async () => {

    fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
            memberQueryResult: [
            {id: 1, Name: "Test1", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 2, Name: "Test2", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 3, Name: "Test3", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 4, Name: "Test4", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 5, Name: "Test5", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 6, Name: "Test6", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 7, Name: "Test7", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 8, Name: "Test8", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 9, Name: "Test9", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 10, Name: "Test10", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            ],
            numEntries: 20,
            currentPage: 1
        })
    })    
    
    fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
            memberQueryResult: [
            {id: 11, Name: "Test11", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 12, Name: "Test12", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 13, Name: "Test13", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 14, Name: "Test14", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 15, Name: "Test15", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 16, Name: "Test16", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 17, Name: "Test17", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 18, Name: "Test18", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 19, Name: "Test19", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 20, Name: "Test20", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            ],
            numEntries: 20,
            currentPage: 2,
        })
    })     
          
    render(
        <MemoryRouter>
            <MembersTable/>
        </MemoryRouter>
    )

    await waitFor(() => {
        expect(screen.getByText("Test1", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test2", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test3", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test4", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test5", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test6", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test7", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test8", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test9", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test10", {exact: true})).toBeInTheDocument();
    });

    expect(screen.queryByText("Test11")).not.toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith('http://localhost:3002/members', 
    {"body": "{\"pageNumber\":1,\"searchTerm\":\"\"}", 
    "headers": {"Content-Type": "application/json"}, 
    "method": "POST"})


    const pageButton = screen.getByText("2", {exact: true});

    fireEvent.click(pageButton);

    await waitFor(() => {
        expect(screen.getByText("Test11", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test12", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test13", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test14", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test15", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test16", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test17", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test18", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test19", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test20", {exact: true})).toBeInTheDocument();
    })

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(screen.queryByText("Test1")).not.toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith('http://localhost:3002/members', 
    {"body": "{\"pageNumber\":2,\"searchTerm\":\"\"}", 
    "headers": {"Content-Type": "application/json"}, 
    "method": "POST"})
})


test("MembersTable renders data and responds to page changes", async () => {

    fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
            memberQueryResult: [
            {id: 1, Name: "Test1", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 2, Name: "Test2", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 3, Name: "Test3", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 4, Name: "Test4", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 5, Name: "Test5", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 6, Name: "Test6", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 7, Name: "Test7", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 8, Name: "Test8", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 9, Name: "Test9", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 10, Name: "Test10", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            ],
            numEntries: 10,
            currentPage: 1,
        })
    }) 

    fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
            memberQueryResult: [
            {id: 1, Name: "Test1", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            ],
            numEntries: 1,
            currentPage: 1,
        })
    }) 


    fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
            memberQueryResult: [
            {id: 1, Name: "Test1", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 2, Name: "Test2", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 3, Name: "Test3", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 4, Name: "Test4", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 5, Name: "Test5", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 6, Name: "Test6", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 7, Name: "Test7", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 8, Name: "Test8", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 9, Name: "Test9", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            {id: 10, Name: "Test10", Company: "Random", Profession: "Cooking", Phone: "9195554782", Email: "test@gmail.com"},
            ],
            numEntries: 10,
            currentPage: 1,
        })
    }) 

    fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
            memberQueryResult: [],
            numEntries: 0,
            currentPage: 1,
        })
    }) 

    render(
        <MemoryRouter>
            <MembersTable/>
        </MemoryRouter>
    )

    await waitFor(() => {
        expect(screen.getByText("Test1", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test2", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test3", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test4", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test5", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test6", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test7", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test8", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test9", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test10", {exact: true})).toBeInTheDocument();
    })

    expect(fetch).toHaveBeenCalledWith('http://localhost:3002/members', 
    {"body": "{\"pageNumber\":1,\"searchTerm\":\"\"}", 
    "headers": {"Content-Type": "application/json"}, 
    "method": "POST"})

    const searchFilter = screen.getByPlaceholderText("Search Member by Name");

    fireEvent.input(searchFilter, { target: { value: 'Test1' } });

    await waitFor(() => {
        expect(screen.getByText("Test1", {exact: true})).toBeInTheDocument();
        expect(screen.queryByText("Test2")).not.toBeInTheDocument();
    })
    
    expect(fetch).toHaveBeenCalledWith('http://localhost:3002/members', 
    {"body": "{\"pageNumber\":1,\"searchTerm\":\"Test1\"}", 
    "headers": {"Content-Type": "application/json"}, 
    "method": "POST"})

    fireEvent.change(searchFilter, {target : {value: ''}})

    await waitFor(() => {
        expect(screen.getByText("Test1", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test2", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test3", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test4", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test5", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test6", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test7", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test8", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test9", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Test10", {exact: true})).toBeInTheDocument();
    })

    fireEvent.change(searchFilter, {target: {value: 'Pizza'}})

    await waitFor(() => {
        expect(screen.queryByText("Test1", {exact: true})).not.toBeInTheDocument();
        expect(screen.queryByText("Test2", {exact: true})).not.toBeInTheDocument();
    })
})




