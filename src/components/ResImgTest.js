import React, { useState } from 'react';

function ResImgTest() {
    const [resname, setResName] = useState("");
    const [resImgurl, setResImgUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/distributor/get-res-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ resname }),
                credentials: 'include',
            });

            const data = await response.json();
            if (response.ok) {
                setResImgUrl(data.resImage);
                console.log(data, "&&&&&");
            } else {
                console.error("Error fetching image:", data.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Enter restaurant name'
                    name='resname'
                    value={resname}
                    onChange={(e) => setResName(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            {resImgurl && <img src={resImgurl} alt="Restaurant" />}
        </div>
    );
}

export default ResImgTest;
