"use client"

interface AdditionalInfoPanelProps {
  itemName: string
  deliveryDate: string
  waitingTime: string
  onItemNameChange: (value: string) => void
  onDeliveryDateChange: (value: string) => void
  onWaitingTimeChange: (value: string) => void
}

export default function AdditionalInfoPanel({
  itemName,
  deliveryDate,
  waitingTime,
  onItemNameChange,
  onDeliveryDateChange,
  onWaitingTimeChange,
}: AdditionalInfoPanelProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <span className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3">
          <span className="text-white text-lg">📋</span>
        </span>
        Additional Information
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => onItemNameChange(e.target.value)}
            placeholder="e.g., Nike Air Max"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Date</label>
          <input
            type="text"
            value={deliveryDate}
            onChange={(e) => onDeliveryDateChange(e.target.value)}
            placeholder="e.g., Tomorrow, Monday"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Wait Time</label>
          <input
            type="text"
            value={waitingTime}
            onChange={(e) => onWaitingTimeChange(e.target.value)}
            placeholder="e.g., 2 minutes, a moment"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  )
}
