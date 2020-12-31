const fetch = require("node-fetch")

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  { userid, max }
) => {
  console.log("Fetching LibraryThing")

  const url = `https://www.librarything.com/api_getdata.php?userid=${userid}&max=${max ||
    100}&showTags=1&showReviews=1&responseType=json`
  const lt = await fetch(url).then(res => res.json())

  for (const [book_id, book] of Object.entries(lt.books)) {
    actions.createNode({
      ...book,
      id: createNodeId(`LibraryThing-${book_id}`),
      internal: {
        type: "LibraryThing",
        contentDigest: createContentDigest(book),
      },
    })
  }
}
