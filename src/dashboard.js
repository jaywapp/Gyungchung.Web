export default function Dashboard(){   

    var user = sessionStorage.getItem("user");
    var email = sessionStorage.getItem("email");

    return (
        <div>
                This is dashboard page
        </div>
    )
}