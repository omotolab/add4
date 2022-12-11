import { Client as NotionClient } from "@notionhq/client"

export const readNotionChannel = async (req, res) => {
  const { database_id, page_id } = req.body
  
  getItems({ database_id, page_id })

  async function getItems ({ database_id, page_id }) 
  {
    const notion = new NotionClient({ auth: process.env.NOTION_KEY })
    let page, list

    if(database_id) {
      list = await notion.databases.query({
        database_id,
        sorts: [
          {
            property: 'id',
            direction: 'ascending',
          },
        ],
      })
    }

    if(page_id) {
      page = await notion.pages.retrieve({ 
        page_id 
      })
    }
    
    res.json({
      list,
      page
    })
  }
  
}

export const updateNotionChannel = async (req, res) => {
  const notion = new NotionClient({ auth: process.env.NOTION_KEY })
  const { parent, properties } = req.body

  console.log('par', properties)
  const response = await addItem({ parent, properties })

  res.json({
    ...response
  })

  async function addItem({ parent, properties }) {
    //console.log('item', item)
    try {
      const response = await notion.pages.create({ parent, properties })
      return response
    } catch (error) {
      console.error(error.body)
    }
  }
}