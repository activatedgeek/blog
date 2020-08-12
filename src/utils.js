export const processRawEdges = edges =>
  edges.map(
    ({
      node: {
        frontmatter: {
          title,
          area,
          cat,
          day,
          year,
          updatedDay,
          updatedYear,
          slug,
          archive,
          draft,
        },
      },
    }) => ({
      title,
      area,
      cat,
      slug,
      archive,
      draft,
      day: updatedDay || day,
      year: updatedYear || year,
    })
  )
