const Heading = ({ heading }) => {
  return (
    <section className={`lg:w-4/6 m-auto sm:my-8 md:my-6 sm:w-5/6`}>
      <div className="flex justify-center items-center gap-2">
        <div className="bg-secondary h-px w-1/6 lg:w-2/6"></div>
        <h4 className="text-center sm:text-base md:text-xl xl:text-2xl px-4 text-secondary font-medium">{heading}</h4>
        <div className="bg-secondary h-px w-1/6 lg:w-2/6"></div>
      </div>
    </section>
  )
}
export default Heading