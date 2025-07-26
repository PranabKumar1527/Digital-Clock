const clock = document.getElementById("clock");

    function createDigitStrip(index) {
      const strip = document.createElement("div");
      strip.className = "digit-strip";

      if (index === 0) {
        strip.classList.add("small-strip"); // Add this class only to first strip
      }

      const digitsContainer = document.createElement("div");
      digitsContainer.className = "digits";

      // Show only 0,1,2 for the first digit strip (index === 0)
      const maxDigit = index === 0 ? 3 : 10;

      for (let i = 0; i < maxDigit; i++) {
        const digit = document.createElement("div");
        digit.className = "digit";
        digit.textContent = i;
        digitsContainer.appendChild(digit);
      }

      strip.appendChild(digitsContainer);
      strip.style.transform = `translateY(0)`;
      strip.id = `digit-${index}`;
      clock.appendChild(strip);
    }

    function updateClock() {
      const now = new Date();
      const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, "");
      const digits = timeStr.split("").map(d => parseInt(d, 10));

      digits.forEach((d, i) => {
        const strip = document.getElementById(`digit-${i}`);
        const digitsContainer = strip.querySelector(".digits");
        const digitElements = digitsContainer.querySelectorAll(".digit");

        digitElements.forEach((el, idx) => {
          el.classList.toggle("active", idx === d);
        });

        const topOffset = i === 0 ? (d * -60) +250 : (d * -60) + 270; // Center for new 600px strip height
        strip.style.transform = `translateY(${topOffset}px)`;
      });
    }

    for (let i = 0; i < 6; i++) {
      createDigitStrip(i);
    }

    updateClock();
    setInterval(updateClock, 1000);