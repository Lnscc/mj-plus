export default function ChatInput({ sendPrompt }: { sendPrompt: ((formData: FormData) => void) | undefined }) {
  return (
    <form action={sendPrompt} className="flex-none p-1 border-t">
      <div className="flex flex-col">
        <div className="flex mb-3">
          <input
            type="text"
            name="themeName"
            className="flex-grow px-4 py-2 border rounded text-black"
            placeholder="Theme..."
          />
          <select name="themeOptions" className="ml-2 px-4 py-2 border rounded text-black w-24">
            <option value="df">df</option>
          </select>
        </div>
        <div className="flex mb-3 items-center">
          <input
            type="text"
            name="params"
            className="flex-grow px-4 py-2 border rounded text-black"
            placeholder="Params..."
          />
          <input
            type="number"
            name="nog"
            className="mx-2 px-4 py-2 border rounded text-black w-20"
            placeholder="nog"
          />
          <input
            type="checkbox"
            name="gpt"
            className="ml-2 w-6 h-6"
          />
          <label htmlFor="gpt" className="ml-1">GPT</label>
        </div>
        <div className="flex">
          <input
            type="text"
            name="prompt"
            className="flex-grow px-4 py-2 mb-3 border rounded text-black"
            placeholder="Prompt..."
            required
          />
          <button className="bg-orange-400 rounded px-4 text-white ml-2 w-24">
            Send
          </button>
        </div>
      </div>
    </form>
  );
}
