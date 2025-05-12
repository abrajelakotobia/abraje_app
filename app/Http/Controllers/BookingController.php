<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class BookingController extends Controller
{
    use \Illuminate\Foundation\Auth\Access\AuthorizesRequests;

 public function index()
{
    $user = Auth::user();

    if (!$user) {
        return redirect()->route('login');
    }

    $bookings = Booking::with(['post', 'user'])
        ->where('user_id', $user->id)
        ->latest()
        ->get();

    return Inertia::render('Booking/Index', [
        'bookings' => $bookings,
    ]);
}


    public function create(): Response
    {
        $posts = Post::all();

        return Inertia::render('Booking/Create', [
            'posts' => $posts,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'post_id' => 'required|exists:posts,id',
            'dates' => 'required|array|min:1',
            'dates.*' => 'date_format:Y-m-d H:i',
            'entry_time' => 'required|date_format:H:i',
        ]);

        foreach ($validated['dates'] as $dateTime) {
            $carbonDateTime = Carbon::createFromFormat('Y-m-d H:i', $dateTime);

            Booking::create([
                'post_id'    => $validated['post_id'],
                'date'       => $carbonDateTime->format('Y-m-d'),
                'entry_time' => $validated['entry_time'],
                'datetime'   => $carbonDateTime,
                'user_id'    => Auth::id(),
            ]);
        }

        return redirect()->route('bookings.index')
            ->with('success', 'Réservations enregistrées avec succès.');
    }

    public function show(Booking $booking): Response
    {
        return Inertia::render('Booking/Show', [
            'booking' => $booking->load('post', 'user'),
        ]);
    }

    public function edit(Booking $booking): Response
    {
        $this->authorize('update', $booking);

        $posts = Post::all();

        return Inertia::render('Booking/Edit', [
            'booking' => $booking,
            'posts' => $posts,
            'initialDates' => [
                Carbon::parse($booking->date)->format('Y-m-d') . ' ' . $booking->entry_time,
            ],
        ]);
    }

    public function update(Request $request, Booking $booking)
    {
        $this->authorize('update', $booking);

        $validated = $request->validate([
            'post_id' => 'required|exists:posts,id',
            'dates' => 'required|array|size:1',
            'dates.*' => 'date_format:Y-m-d H:i',
            'entry_time' => 'required|date_format:H:i',
        ]);

        $dateTime = Carbon::createFromFormat('Y-m-d H:i', $validated['dates'][0]);

        $booking->update([
            'post_id'    => $validated['post_id'],
            'date'       => $dateTime->format('Y-m-d'),
            'entry_time' => $validated['entry_time'],
            'datetime'   => $dateTime,
        ]);

        return redirect()->route('bookings.index')
            ->with('success', 'Réservation mise à jour avec succès.');
    }

    public function destroy(Booking $booking)
    {
        $this->authorize('delete', $booking);

        $booking->delete();

        return redirect()->route('bookings.index')
            ->with('success', 'Réservation supprimée avec succès.');
    }
}
