import { useState } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker'; // Import DateObject type
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import { useForm } from '@inertiajs/react';

type BookingFormData = {
  dates: string[];
  entry_time: string;
};

export default function BookingForm() {
  const [dates, setDates] = useState<DateObject[]>([]); // Proper typing
  const { data, setData, post, processing, errors } = useForm<BookingFormData>({
    dates: [],
    entry_time: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setData(
      "dates",
      dates.map((date) => date.format("YYYY-MM-DD HH:mm"))
    );
    post("/bookings");
  };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dates et Heures
                </label>
                <DatePicker
                    multiple
                    value={dates}
                    onChange={setDates}
                    format="YYYY-MM-DD HH:mm"
                    plugins={[<TimePicker position="bottom" />]}
                    className="teal"
                />
                {errors.dates && (
                    <div className="text-red-500">{errors.dates}</div>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
                    Heure d’entrée
                </label>
                <input
                    type="time"
                    value={data.entry_time}
                    onChange={(e) => setData("entry_time", e.target.value)}
                    className="border p-2 rounded"
                />
                {errors.entry_time && (
                    <div className="text-red-500">{errors.entry_time}</div>
                )}
            </div>

            <button
                type="submit"
                disabled={processing}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
            >
                {processing ? "En cours..." : "Réserver"}
            </button>
        </form>
    );
}
