const Header = ({ header }) => (<h1>{header}</h1>)

const Content = ({ content }) => {
  return (
    <div>
      <Parts parts={content} />
      <Total parts={content} />
    </div>
  )
}

const Parts = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <div key={part.id}>
          {part.name} {part.exercises}
        </div>
      )}
    </div>
  )
}

const Total = ({ parts }) => (
  <b>
    Total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
  </b>
)

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map(course =>
        <div key={course.id}>
          <Header header={course.name} />
          <Content content={course.parts} />
        </div>
      )}
    </div>
  )
}

export default Course