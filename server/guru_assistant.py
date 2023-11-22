import os
import json
from openai import OpenAI
# from dotenv import load_dotenv
from IPython.display import display
from flask import Flask, make_response, jsonify, request, session

# load_dotenv()
key = "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"
# key = os.environ.get('OPENAI_API_KEY')
# key = os.getenv("OPENAIAP_SECRET_KEY")

client = OpenAI(api_key=key)


### IF you have a local file you want the assistant to use:
# file = client.files.create(
#     file=open("your_file_name.extensionName", "rb"),
#     purpose='assistants'
# )

guru_instructions = """
    You are an expert in electric skateboards who will be responding to
    and answering questions from prospective buiders, aka users. 
    Please follow the instructions below:

    1. You will come up with the most appropriate response that suits the best for 
    builder's question. If you are unable to provide an appropriate response to the
    builder, then please refer them to the following websites: 
    https://electric-skateboard.builders/ 
    , https://forum.esk8.news/

    2. If you don't find a match within the aforementioned website, 
    then please refrain from answering the question and come up 
    with a reasonable excuse or reason.

    3. Please refrain from engaing in any other conversation that 
    isn't related to the field of electric skateboards, and in the 
    case that the builder asks questions that is unrelated to and/or 
    outside the scope of electric skateboards, then please respond 
    with: 'I apologize but I can only answer questions that are 
    related to electric skateboards.'
    """

    # 1. You will search through the following website and come up 
    # with the most appropriate response that suits the best for 
    # builder's question. The website is: https://electric-skateboard.builders/

    # 1. You will come up with the most appropriate response that suits the best for 
    # builder's question. If you are unable to provide an appropriate response to the
    # builder, then please refer them to the following websites: 
    # https://electric-skateboard.builders/ 
    # , https://forum.esk8.news/



# def show_json(obj):
#     display(json.loads(obj.model_dump_json()))



## input from the questions that user types in??
# user_input_data = request.get_json()

def guru_assistant(user_input):
    assistant = client.beta.assistants.create(
        name="Esk8 Guru",
        instructions=guru_instructions,
        model="gpt-4-1106-preview",
        tools=[{"type": "retrieval"}]
    )


    thread = client.beta.threads.create()
    # print(f'Your thread id is: {thread.id}')

    message = client.beta.threads.messages.create(
        thread_id=thread.id,
        role="user",
        content=user_input
    )


    ### How do I set a prompt that the assistant ask initially??
    # message = client.beta.threads.messages.create(
    #     thread_id=thread.id,
    #     role="assistant",
    #     content=input("Hello, I am the one and only Esk8 Guru. What questions do you have for me?")
    # )


    run = client.beta.threads.runs.create(
        thread_id=thread.id,
        assistant_id=assistant.id,
        instructions="Please address the user in the appropriate manner."
    )
    # print(f'Your run id is: {run.id}')

    run = client.beta.threads.runs.retreve(
        thread_id=thread.id,
        run_id=run.id
    )

    messages = client.beta.threads.messages.list(
        thread_id=thread.id
    )

    for message in reversed(messages.data):
        return(message.role + ": " + message.content[0].text.value)



























# STATUS_COMPLETED = "completed"

# count = 0

# while count == 0:
#     text = input("Hello, I am your Esk8 Builder assistant, how can I help you?\n")

#     count += 1

#     message = client.beta.threads.messages.create(
#         thread_id=thread.id,
#         role="user",
#         content=text
#     )

#     new_run = client.beta.threads.runs.create(
#         thread_id=thread.id,
#         assistant_id=assistant.id,
#         instructions=guru_instructions,
#     )

#     status = None

#     while status != STATUS_COMPLETED:
#         run_list = client.beta.threads.runs.retrieve(
#             thread_id=thread.id,
#             run_id=new_run.id
#         )
#         status = run_list.status
    
#         messages = client.beta.threads.messages.list(
#             thread_id=thread.id
#         )
    
#         while count > 0:
#             text = input("I hope you find my response helpful. Do you have any other questions?\n")

#             count += 1

#             message = client.beta.threads.messages.create(
#                 thread_id=thread.id,
#                 role="user",
#                 content=text
#             )

#             new_run = client.beta.threads.runs.create(
#                 thread_id=thread.id,
#                 assistant_id=assistant.id,
#                 instructions=guru_instructions,
#             )

#             while status != STATUS_COMPLETED:
#                 run_list = client.beta.threads.runs.retrieve(
#                     thread_id=thread.id,
#                     run_id=new_run.id
#                 )
#                 status = run_list.status
            
#                 messages = client.beta.threads.messages.list(
#                     thread_id=thread.id
#                 )
