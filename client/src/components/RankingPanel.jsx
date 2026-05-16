import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical, X, Plus, Send, Check, Info } from 'lucide-react';

export default function RankingPanel({ destinations, myVote, onSubmit, onDelete }) {
  const [ranked, setRanked] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (myVote?.rankings?.length) {
      setRanked(myVote.rankings.map(r => r.destination).filter(Boolean));
      setSubmitted(true);
    } else {
      setRanked([]);
      setSubmitted(false);
    }
  }, [myVote]);

  const available = destinations.filter(d => !ranked.find(r => r._id === d._id));

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = [...ranked];
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setRanked(items);
    setSubmitted(false);
  };

  const addToRanking = (dest) => {
    if (ranked.length >= 10) return;
    setRanked([...ranked, dest]);
    setSubmitted(false);
  };

  const removeFromRanking = (id) => {
    setRanked(ranked.filter(r => r._id !== id));
    setSubmitted(false);
  };

  const handleSubmit = async () => {
    if (!ranked.length) return;
    setSubmitting(true);
    try {
      await onSubmit(ranked.map(r => ({ destination: r._id })));
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold" style={{ fontFamily: 'Outfit' }}>
              Your Ranked List
            </h3>
            <span className="text-sm text-text-muted">{ranked.length}/10</span>
          </div>

          {!ranked.length ? (
            <div className="text-center py-12 text-text-secondary">
              <Info className="w-8 h-8 mx-auto mb-3 text-text-muted" />
              <p>Add destinations from the right panel</p>
              <p className="text-sm mt-1">Drag to reorder — #1 gets 10 points!</p>
            </div>
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="rankings">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
                    {ranked.map((dest, i) => (
                      <Draggable key={dest._id} draggableId={dest._id} index={i}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                              snapshot.isDragging
                                ? 'bg-accent/10 border border-accent/30 shadow-lg shadow-accent/10'
                                : 'bg-bg-input border border-border hover:border-border-focus/30'
                            }`}
                          >
                            <div {...provided.dragHandleProps} className="text-text-muted hover:text-accent cursor-grab active:cursor-grabbing">
                              <GripVertical className="w-4 h-4" />
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-sm font-bold text-accent">
                              #{i + 1}
                            </div>
                            <span className="text-lg">{dest.emoji}</span>
                            <span className="flex-1 font-medium">{dest.name}</span>
                            <span className="text-sm px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold">
                              {10 - i} pts
                            </span>
                            <button
                              onClick={() => removeFromRanking(dest._id)}
                              className="p-1 rounded-lg hover:bg-danger/10 text-text-muted hover:text-danger transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}

          {ranked.length > 0 && (
            <button
              onClick={handleSubmit}
              disabled={submitting || submitted}
              className={`mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
                submitted
                  ? 'bg-success/10 text-success border border-success/20'
                  : 'btn-primary'
              }`}
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : submitted ? (
                <><Check className="w-4 h-4" /> Votes Saved!</>
              ) : (
                <><Send className="w-4 h-4" /> Submit Rankings</>
              )}
            </button>
          )}
          
          {myVote && (
            <button
              onClick={onDelete}
              className="mt-3 w-full py-2 text-sm font-medium text-danger hover:bg-danger/10 rounded-xl transition-colors"
            >
              Clear my current rankings
            </button>
          )}
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Outfit' }}>
            Available Destinations
          </h3>
          {!available.length ? (
            <p className="text-text-secondary text-sm text-center py-8">All destinations ranked! 🎉</p>
          ) : (
            <div className="space-y-2">
              {available.map(dest => (
                <button
                  key={dest._id}
                  onClick={() => addToRanking(dest)}
                  disabled={ranked.length >= 10}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-bg-input border border-border hover:border-accent/30 transition-all text-left group disabled:opacity-40"
                >
                  <span className="text-lg">{dest.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium block truncate">{dest.name}</span>
                    <span className="text-xs text-text-muted">{dest.region}</span>
                  </div>
                  <Plus className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
