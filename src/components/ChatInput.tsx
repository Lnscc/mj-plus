export default function ChatInput({ sendPrompt }: { sendPrompt: ((formData: FormData) => void) | undefined }) {
  return (
    <form action={sendPrompt} className="flex-none p-1 border-t">
      <div className="flex">
        <input
          type="text"
          name="prompt"
          className="flex-grow px-4 py-2 mb-3 border rounded text-black"
          placeholder="Prompt..."
          required
        />
        <button className="bg-orange-400 rounded px-4 py-2 text-white ml-2">
          Send
        </button>
      </div>
    </form>
  );
}
