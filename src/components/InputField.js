export const InputField=()=>{
    return(
        <section>
            <input
              type="number"
              placeholder="Phone Number"
              className="h-10 w-56 border-2 focus:outline-none mb-6 px-2 font-semibold text-16"
              value={phoneText}
              onChange={(e) => setPhoneText(e.target.value)}
            />
        </section>
    )
}