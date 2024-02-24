"use client";

function isValidEmail(email: string) {
    // Regular expression for basic email validation
    const regex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
}



export default function Page(){
    return (
        <>

            <div className='w-[300px]'>
                <form onSubmit={(e) => {
                    const formData = new FormData(e.target as HTMLFormElement);
                    const emailValue = formData.get('EMAIL') as string;
                    
                    if(!emailValue || !isValidEmail(emailValue)) {
                        e.preventDefault();
                        alert('Please enter a valid email address.');
                    }
                }} action="https://gmail.us21.list-manage.com/subscribe/post?u=81970368da0e2130fb003359e&amp;id=a9cfdaf9f5&amp;f_id=0021e8e6f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank">
                    <div className='flex flex-col'>
                        <label className='text-xl' htmlFor='mce-EMAIL'>Email Address*</label>
                        <input type="email" name="EMAIL" className="pl-1 border-solid border rounded border-black" id="mce-EMAIL" required={true} />
                        <input className="hidden" type="text" name="b_81970368da0e2130fb003359e_a9cfdaf9f5" tabIndex={-1}/>
                    </div>
                    <div className="mt-5 w-32 cursor-pointer text-center bg-transparent hover:bg-text-primary text-text-primary font-semibold hover:text-white py-2 px-4 border border-text-primary hover:border-transparent rounded">
                        <input type="submit" name="subscribe" id="mc-embedded-subscribe" className="" value="Subscribe" readOnly /> 
                    </div>
                </form>
            </div>
        </>
    )    
}