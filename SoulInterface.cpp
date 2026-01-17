// SoulInterface.cpp
// Spektri-Genesis: Human–Tool Boundary (Commit-Gated Interface)
// Invariant: LLM may compute/simulate/recommend — Human owns state and commits.

#include <iostream>
#include <string>
#include <vector>
#include <optional>

struct State {
    std::string snapshot;     // Human-owned description of current state
    std::string constraints;  // Hard constraints (time, money, ethics, safety)
};

struct Option {
    std::string label;        // Short name
    std::string rationale;    // Why it might work
    std::string next_action;  // Concrete next step
};

struct Commit {
    std::string chosen_label;
    std::string action;       // Irreversible action statement
};

class ToolSimulator {
public:
    // Stub: replace with your actual gateway call (TypeScript API / local model / etc.)
    std::vector<Option> propose(const State& s) {
        // IMPORTANT: tool proposes only; no commitments.
        return {
            {"A", "Minimize complexity; stabilize baseline.", "Do 1 concrete task in 10 minutes."},
            {"B", "Ship one artifact; reduce ambiguity.", "Open repo and merge 1 PR / commit 1 file."},
            {"C", "Change environment; reduce noise.", "Walk outside 15 min; then decide."}
        };
    }
};

class CommitGate {
public:
    // Human must explicitly confirm commit. Tool cannot auto-commit.
    std::optional<Commit> request_commit(const std::vector<Option>& opts) {
        std::cout << "\nOPTIONS (tool output):\n";
        for (const auto& o : opts) {
            std::cout << " - [" << o.label << "] " << o.rationale
                      << " | Next: " << o.next_action << "\n";
        }

        std::cout << "\nChoose option label (or X to abort): ";
        std::string choice;
        std::getline(std::cin, choice);
        if (choice == "X" || choice == "x") return std::nullopt;

        const Option* selected = nullptr;
        for (const auto& o : opts) if (o.label == choice) selected = &o;

        if (!selected) {
            std::cout << "Invalid choice. Abort.\n";
            return std::nullopt;
        }

        std::cout << "Type COMMIT to confirm irreversible action: ";
        std::string confirm;
        std::getline(std::cin, confirm);
        if (confirm != "COMMIT") {
            std::cout << "Not committed.\n";
            return std::nullopt;
        }

        Commit c{selected->label, selected->next_action};
        return c;
    }
};

int main() {
    State s;
    std::cout << "STATE SNAPSHOT (human-owned): ";
    std::getline(std::cin, s.snapshot);

    std::cout << "CONSTRAINTS (hard boundaries): ";
    std::getline(std::cin, s.constraints);

    ToolSimulator tool;
    auto options = tool.propose(s);

    CommitGate gate;
    auto commit = gate.request_commit(options);

    if (!commit) {
        std::cout << "\nSTATUS: NO COMMIT. Simulation continues.\n";
        return 0;
    }

    // The only place where "reality changes" in this program:
    std::cout << "\nSTATUS: COMMITTED.\n";
    std::cout << "Chosen: " << commit->chosen_label << "\n";
    std::cout << "Action: " << commit->action << "\n";

    // TODO: write commit to log, execute scripts, open tasks, etc.
    return 0;
}
