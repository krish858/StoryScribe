import Groq from "groq-sdk";
import { bookModel } from "../models/Book";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function genBookData(prompt: string, ChNo: string, Chlen: string) {
  try {
    const content = `
    Given a prompt "${prompt}", generate a title for a book. also a breif description of the story so when i give it to a llm model it can generate a story based on the title and description.

    json_response_format = {
      title: "title of the book",
      description: "description of the story"
    }
    
    also kep in mind that the story should have ${ChNo} chapters and each chapter should be approx ${Chlen} pages. create a description accordingly.
  `;
    const messages: any = [];

    messages.push({
      role: "user",
      content: content,
    });

    const response = await groq.chat.completions.create({
      messages: messages,
      model: "llama-3.3-70b-versatile",
      temperature: 1.02,
      max_completion_tokens: 32768,
      top_p: 1,
      stream: false,
      response_format: {
        type: "json_object",
      },
      stop: null,
    });
    return {
      status: "success",
      data: JSON.parse(response.choices[0].message.content as string),
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      error: error,
    };
  }
}

export async function genChapter(
  description: string,
  ChNo: string,
  Chlen: string,
  id: string
) {
  try {
    let summary_till_last = "";
    for (let i = 1; i <= parseInt(ChNo); i++) {
      if (i === 1) {
        const prompt = `you are the best writter in the world and you are writting a book with ${ChNo} chapters. the description of the book is ${description}.Each chapter should be of appx ${Chlen} pages. write the first chapter of the book.
        json_response_format = {
          title: "title of the chapter",
          content: "content of the chapter"
          summary: "summary of the chapter"
        }

        Write Summary in such way that it should include the summary of the previous chapters(if any) as well as the current chapter.so When given with description to a llm model
        it could generate the next chapter of the book and remeber a chapter should be approx ${Chlen} pages so generate content accordingly.

        `;
        const messages: any = [];
        messages.push({
          role: "user",
          content: prompt,
        });
        const response = await groq.chat.completions.create({
          messages: messages,
          model: "llama-3.3-70b-versatile",
          temperature: 1.02,
          max_completion_tokens: 32768,
          top_p: 1,
          stream: false,
          response_format: {
            type: "json_object",
          },
          stop: null,
        });
        let json_response = await JSON.parse(
          response.choices[0].message.content as string
        );
        summary_till_last = await json_response.summary;
        await bookModel.findOneAndUpdate(
          { id: id },
          {
            $push: {
              content: {
                chapter: i,
                title: json_response.title,
                content: json_response.content,
              },
            },
          }
        );
      } else if (i === parseInt(ChNo)) {
        const prompt = `you are the best writter in the world and you are writting a book with ${ChNo} chapters.you are currently writting the last chapter, the description of the book is ${description} and a summary till last chapter is ${summary_till_last}.Each chapter should be of appx ${Chlen} pages. write the last chapter of the book.
                json_response_format = {
                  title: "title of the chapter",
                  content: "content of the chapter"
                }
              And remeber a chapter should be approx ${Chlen} pages so generate content accordingly.
        `;
        const messages: any = [];
        messages.push({
          role: "user",
          content: prompt,
        });
        const response = await groq.chat.completions.create({
          messages: messages,
          model: "llama-3.3-70b-versatile",
          temperature: 1.02,
          max_completion_tokens: 32768,
          top_p: 1,
          stream: false,
          response_format: {
            type: "json_object",
          },
          stop: null,
        });
        let json_response = await JSON.parse(
          response.choices[0].message.content as string
        );
        summary_till_last = await json_response.summary;
        await bookModel.findOneAndUpdate(
          { id: id },
          {
            $push: {
              content: {
                chapter: i,
                title: json_response.title,
                content: json_response.content,
              },
            },
          }
        );
      } else {
        const prompt = `you are the best writter in the world and you are writting a book with ${ChNo} chapters.you are currently writting the ${i.toString()} chapter, the description of the book is ${description} and a summary till last chapter is ${summary_till_last}.Each chapter should be of appx ${Chlen} pages. write the ${i.toString()} chapter of the book.
        json_response_format = {
          title: "title of the chapter",
          content: "content of the chapter"
          summary: "summary of the chapter"
        }

        Write Summary in such way that it should include the summary of the previous chapters(if any) as well as the current chapter.so When given with description to a llm model
        it could generate the next chapter of the book and remeber a chapter should be approx ${Chlen} pages so generate content accordingly.
        `;
        const messages: any = [];
        messages.push({
          role: "user",
          content: prompt,
        });
        const response = await groq.chat.completions.create({
          messages: messages,
          model: "llama-3.3-70b-versatile",
          temperature: 1.02,
          max_completion_tokens: 32768,
          top_p: 1,
          stream: false,
          response_format: {
            type: "json_object",
          },
          stop: null,
        });
        let json_response = await JSON.parse(
          response.choices[0].message.content as string
        );
        await bookModel.findOneAndUpdate(
          { id: id },
          {
            $push: {
              content: {
                chapter: i,
                title: json_response.title,
                content: json_response.content,
              },
            },
          }
        );
      }
    }
    return {
      status: "success",
    };
  } catch (error) {
    return {
      status: "error",
      error: error,
    };
  }
}
