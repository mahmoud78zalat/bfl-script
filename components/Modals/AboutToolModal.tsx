"use client"

interface AboutToolModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AboutToolModal({ isOpen, onClose }: AboutToolModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        id="about-tool-modal"
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
              <span className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white text-2xl">ℹ️</span>
              </span>
              About BFL Customer Service Helper
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">
              ✕
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">🎯 Purpose</h3>
              <p className="text-blue-700">
                This tool is designed to help Brands For Less customer service agents provide consistent, professional,
                and efficient support to customers in both English and Arabic.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-xl font-semibold text-green-800 mb-3">✨ Key Features</h3>
                <ul className="text-green-700 space-y-2">
                  <li>• Bilingual reply templates (EN/AR)</li>
                  <li>• Smart recommendations based on usage</li>
                  <li>• Order ID to User ID converter</li>
                  <li>• Country detection from phone numbers</li>
                  <li>• Customer message analysis</li>
                  <li>• Professional email composer</li>
                  <li>• Personalized agent experience</li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-xl font-semibold text-purple-800 mb-3">🚀 How to Use</h3>
                <ul className="text-purple-700 space-y-2">
                  <li>• Fill in customer information</li>
                  <li>• Select appropriate language</li>
                  <li>• Click templates to copy responses</li>
                  <li>• Use smart recommendations</li>
                  <li>• Convert order IDs when needed</li>
                  <li>• Compose professional emails</li>
                  <li>• Analyze customer messages for context</li>
                </ul>
              </div>
            </div>

            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">💡 Pro Tips</h3>
              <ul className="text-orange-700 space-y-2">
                <li>• Templates automatically personalize with customer names</li>
                <li>• The tool learns from your usage patterns</li>
                <li>• Smart recommendations appear after using templates</li>
                <li>• Phone numbers auto-detect customer countries</li>
                <li>• All data is stored locally for privacy</li>
                <li>• Use the message analyzer for complex customer inquiries</li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <h3 className="text-xl font-semibold text-red-800 mb-3">⚠️ Important Notes</h3>
              <ul className="text-red-700 space-y-2">
                <li>• Always verify information before sending responses</li>
                <li>• Customize templates as needed for specific situations</li>
                <li>• The tool follows BFL's "no exchange, only return" policy</li>
                <li>• Return fees vary by country - check the customer's location</li>
                <li>• Use professional language even when customers are frustrated</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">👨‍💻 Developer</h3>
              <p className="text-gray-700">
                Made by: <span className="font-semibold text-blue-600">Mahmoud Zalat</span>
              </p>
              <p className="text-gray-600 text-sm mt-2">Built with ❤️ for Brands For Less Customer Service Team</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-md"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
